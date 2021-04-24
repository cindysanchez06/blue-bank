import Head from "next/head";
import styles from "../styles/index.module.css";
import Button from "@material-ui/core/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Banco</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a className={styles.link} href="/register">
          <Button className={styles.button} variant="contained" color="primary">
            Creacion de Cuenta
          </Button>
        </a>
        <a className={styles.link} href="/list">
          <Button className={styles.button} variant="contained" color="primary">
            Consultar Saldo
          </Button>
        </a>
        <a className={styles.link} href="/increase">
          <Button className={styles.button} variant="contained" color="primary">
            Consignar
          </Button>
        </a>
        <a className={styles.link} href="/withholding">
          <Button className={styles.button} variant="contained" color="primary">
            Retiro
          </Button>
        </a>
      </main>
    </div>
  );
}
