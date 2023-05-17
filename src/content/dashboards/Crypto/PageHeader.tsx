import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const user = {
    name: 'Ceiber Garibay Choque',
    avatar: '/static/images/avatars/3.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenido, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
        ¡Hoy es un buen día para comenzar a operar con la aplicacion!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
