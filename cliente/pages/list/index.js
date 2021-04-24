import Head from "next/head";
import styles from "./styles.module.css";
import { Formik } from "formik";
import { Input, Dialog } from "../../components";
import Button from "@material-ui/core/Button";
import { schema, INITIAL_VALUES } from "./list.schema";
import { useState } from "react";
import { AccountService } from "../../services";
import { useRouter } from "next/router";

export default function List() {
  const [fetchData, setFetchData] = useState({});
  const [dialog, setDialog] = useState({ open: false, content: {} });
  const router = useRouter();

  const onRedirect = () => {
    router.push("/");
  };

  const onSubmit = (values) => {
    AccountService.getAmount({ ...values })
      .then((response) => {
        setFetchData({ isLoading: false });
        setDialog({
          content: {
            title: `Señor (a) ${response.data.name}`,
            description: `Su saldo es de $ ${response.data.amount}`,
          },
          open: !dialog.open,
        });
      })
      .catch(() => {
        setDialog({
          content: {
            title: `Error en Solicitud!`,
            description: `Error en los datos, por favor vertifique y luego intente de nuevo.`,
          },
          open: !dialog.open,
        });
      });
  };

  const handleShowDialog = () => {
    setDialog({ ...dialog, open: !dialog.open });
    onRedirect();
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Consulta de Saldo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Consulta de Saldo</h1>
                <Input
                  type="text"
                  name="account"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.account}
                  label={"Numero de cuenta"}
                  error={touched.account && errors.account}
                />
                <Button
                  className={styles.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={fetchData.isLoading}
                >
                  {fetchData.isLoading ? "Cargando" : "Consultar"}
                </Button>
                <Button
                  className={styles.button}
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={onRedirect}
                >
                  Salir
                </Button>
              </form>
            )}
          </Formik>
        </main>
      </div>
      <Dialog {...dialog} handleShow={handleShowDialog} />
    </>
  );
}
