export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Button size
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * Whether button is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether button is in loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Additional CSS classes
   */
  className?: string;
  }
