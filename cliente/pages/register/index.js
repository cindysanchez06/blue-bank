import Head from "next/head";
import styles from "./styles.module.css";
import { Formik } from "formik";
import { Input, Dialog } from "../../components";
import Button from "@material-ui/core/Button";
import { schema, INITIAL_VALUES } from "./register.schema";
import { useState } from "react";
import { AccountService } from "../../services";
import { useRouter } from "next/router";

export default function Register() {
  const [fetchData, setFetchData] = useState({});
  const [dialog, setDialog] = useState({ open: false, content: {} });
  const router = useRouter();

  const onRedirect = () => {
    router.push("/");
  };

  const onSubmit = (values) => {
    AccountService.register({ ...values }).then((response) => {
      setFetchData({ isLoading: false });
      setDialog({
        content: {
          title: `Creacion de cuenta #${response.data.account_number}`,
          description: `Su cuenta a sido creado correctamente, por favor guarde su numero de cuenta.`,
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
          <title>Registro Cuenta</title>
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
                <h1 className={styles.title}>Registro Cuenta</h1>
                <Input
                  type="text"
                  name="fullname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname}
                  label={"Nombre Completo"}
                  error={touched.fullname && errors.fullname}
                />
                <Input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                  label={"Monto Inicial"}
                  error={touched.amount && errors.amount}
                />
                <Button
                  className={styles.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={fetchData.isLoading}
                >
                  {fetchData.isLoading ? "Cargando" : "Guardar"}
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
