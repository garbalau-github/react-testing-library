import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });
  const passwordInput = screen.getByLabelText('Password');
  const passwordConfirmationInput = screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInput, email);
  }
  if (password) {
    userEvent.type(passwordInput, password);
  }
  if (confirmPassword) {
    userEvent.type(passwordConfirmationInput, confirmPassword);
  }

  return {
    emailInput,
    passwordInput,
    passwordConfirmationInput,
  };
};

const clickSubmit = () => {
  userEvent.click(
    screen.getByRole('button', {
      name: /submit/i,
    })
  );
};

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  describe('Inputs and Usability', () => {
    test('form is loaded', () => {
      const form = screen.getByRole('form');

      expect(form.value).toBeInTheDocument;
    });

    test('inputs are empty', () => {
      const { emailInput, passwordInput, passwordConfirmationInput } =
        typeIntoForm({
          email: '',
          password: '',
          confirmPassword: '',
        });

      expect(emailInput.value).toBe('');

      expect(passwordInput.value).toBe('');

      expect(passwordConfirmationInput.value).toBe('');
    });

    test('user should be able to type in email field', () => {
      const { emailInput } = typeIntoForm({ email: 'selena@gmail.com' });

      expect(emailInput.value).toBe('selena@gmail.com');
    });

    test('user should be able to type in password field', () => {
      const { passwordInput } = typeIntoForm({ password: 'password!' });

      expect(passwordInput.value).toBe('password!');
    });

    test('user should be able to type in password confirmation field', () => {
      const { passwordConfirmationInput } = typeIntoForm({
        confirmPassword: 'password!',
      });

      expect(passwordConfirmationInput.value).toBe('password!');
    });
  });

  describe('Error Handling', () => {
    test('should show email error message on invalid email', () => {
      expect(
        screen.queryByText(/The email you input is invalid/i)
      ).not.toBeInTheDocument();

      typeIntoForm({ email: 'selenagmail.com' });

      clickSubmit();

      expect(
        screen.queryByText(/The email you input is invalid/i)
      ).toBeInTheDocument();
    });

    test('should show password error message when password is shorter than 5 characters', () => {
      typeIntoForm({
        email: 'selena@gmail.com',
      });

      expect(
        screen.queryByText(/The password must be more than 5 symbols/i)
      ).not.toBeInTheDocument();

      typeIntoForm({
        password: '1234',
      });

      clickSubmit();

      expect(
        screen.queryByText(/The password must be more than 5 symbols/i)
      ).toBeInTheDocument();
    });

    test('should show error if passwords dont match', () => {
      typeIntoForm({
        email: 'selena@gmail.com',
        password: 'password123',
        confirmPassword: 'password456',
      });

      expect(
        screen.queryByText(/Passwords dont match/i)
      ).not.toBeInTheDocument();

      clickSubmit();

      expect(screen.queryByText(/Passwords dont match/i)).toBeInTheDocument();
    });
  });
});
