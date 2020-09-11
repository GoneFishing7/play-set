declare module "react-dark-mode-toggle" {
  function NightModeToggle(props: {
    size?: number | string;
    checked?: boolean;
    onChange?: Dispatch<SetStateAction<boolean>>;
    speed?: number;
  }): React.ReactElement;
  export default NightModeToggle;
}
