import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "../Transactions/PageHeader";
import { Grid, Container } from "@mui/material";
import Customer from "../Transactions/CustomerList";

function ApplicationsCustomer(){
    return(
        <>
            <Helmet>
                <title>Clientes</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader/>
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
                    <Grid item xs={12}>
                    <Customer />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default ApplicationsCustomer;