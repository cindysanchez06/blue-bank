import TextField from '@material-ui/core/TextField';
import styles from './input.module.css';

export default function Input({ error, ...props }) {
  return (
    <div className={styles.container}>
      <TextField
        error={!!error}
        {...props}
        className={styles.input}
        helperText={error}
      />
    </div>
  );
}
