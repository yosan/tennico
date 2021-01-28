import { Client, Status } from '@googlemaps/google-maps-services-js'
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { google } from 'config'
import { useFormik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

const CourtSchema = Yup.object().shape({
  name: Yup.string()
    .required('必須項目です')
    .max(100, '最大100文字で入力してください'),
  address: Yup.string()
    .required('必須項目です')
    .max(100, '最大100文字で入力してください'),
  price: Yup.string()
    .required('必須項目です')
    .max(200, '最大200文字で入力してください'),
  url: Yup.string().url().max(500, '最大500文字で入力してください'),
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    input: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  })
)

const surfaceMax = 50

const client = new Client({})

const NewCourt: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      price: '',
      url: null,
      surfaceOmni: 0,
      surfaceHard: 0,
      surfaceCray: 0,
      nighter: false,
      latitude: 0,
      longitude: 0,
    },
    validationSchema: CourtSchema,
    onSubmit: (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    },
  })

  const onClickGeo = React.useCallback(async () => {
    if (formik.errors.address) {
      return
    }

    const result = await client.geocode({
      params: {
        address: formik.values.address,
        key: google.apiKeyGeo,
      },
    })

    if (result.data.status === Status.OK) {
      formik.setValues({
        ...formik.values,
        latitude: result.data.results[0].geometry.location.lat,
        longitude: result.data.results[0].geometry.location.lng,
      })
      formik.setTouched({
        ...formik.touched,
        latitude: true,
        longitude: true,
      })
    }
  }, [formik.values.address])

  return (
    <main>
      <Container>
        <Typography variant="h5" component="h2">
          コート追加
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            error={formik.touched.name && formik.errors.name !== undefined}
            id="name"
            label="コート名"
            value={formik.values.name}
            helperText={formik.touched.name && formik.errors.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.input}
            name="name"
            fullWidth
          />
          <TextField
            error={
              formik.touched.address && formik.errors.address !== undefined
            }
            id="address"
            label="住所"
            value={formik.values.address}
            helperText={formik.touched.address && formik.errors.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.input}
            name="address"
            fullWidth
          />
          <Button
            disabled={!formik.values.address}
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={onClickGeo}
          >
            住所から座標取得
          </Button>
          <TextField
            error={
              formik.touched.latitude && formik.errors.latitude !== undefined
            }
            id="latitude"
            label="緯度"
            value={formik.values.latitude}
            helperText={formik.touched.url && formik.errors.latitude}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.input}
            name="latitude"
          />
          <TextField
            error={
              formik.touched.longitude && formik.errors.longitude !== undefined
            }
            id="longitude"
            label="経度"
            value={formik.values.longitude}
            helperText={formik.touched.url && formik.errors.longitude}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.input}
            name="longitude"
          />
          <TextField
            error={formik.touched.price && formik.errors.price !== undefined}
            id="price"
            label="利用料金"
            value={formik.values.price}
            helperText={formik.touched.price && formik.errors.price}
            placeholder="1時間　平日1,300円　土日祝日1,300円　【夜間照明料】 1時間以内500円"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.input}
            name="price"
            fullWidth
          />
          <TextField
            error={formik.touched.url && formik.errors.url !== undefined}
            id="url"
            label="URL"
            value={formik.values.url}
            helperText={formik.touched.url && formik.errors.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.input}
            name="url"
            fullWidth
          />
          <TextField
            error={
              formik.touched.surfaceOmni &&
              formik.errors.surfaceOmni !== undefined
            }
            id="surface-omni"
            label="人工芝面数"
            value={formik.values.surfaceOmni}
            helperText={formik.touched.surfaceOmni && formik.errors.surfaceOmni}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.select}
            name="surfaceOmni"
            select
          >
            {Array.from(Array(surfaceMax + 1).keys()).map((num) => (
              <MenuItem key={`surface-omni-${num}`} value={num}>
                {num}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={
              formik.touched.surfaceHard &&
              formik.errors.surfaceHard !== undefined
            }
            id="surface-hard"
            label="ハード面数"
            value={formik.values.surfaceHard}
            helperText={formik.touched.surfaceHard && formik.errors.surfaceHard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.select}
            name="surfaceHard"
            select
          >
            {Array.from(Array(surfaceMax + 1).keys()).map((num) => (
              <MenuItem key={`surface-hard-${num}`} value={num}>
                {num}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={
              formik.touched.surfaceCray &&
              formik.errors.surfaceCray !== undefined
            }
            id="surface-cray"
            label="クレー面数"
            value={formik.values.surfaceCray}
            helperText={formik.touched.surfaceCray && formik.errors.surfaceCray}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.select}
            name="surfaceCray"
            select
          >
            {Array.from(Array(surfaceMax + 1).keys()).map((num) => (
              <MenuItem key={`surface-cray-${num}`} value={num}>
                {num}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.nighter}
                onChange={formik.handleChange}
                name="nighter"
                color="primary"
              />
            }
            label="ナイター設備有"
            className={classes.input}
            name="nighter"
          />
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            color="secondary"
            variant="contained"
            className={classes.button}
            fullWidth
          >
            登録
          </Button>
        </form>
      </Container>
    </main>
  )
}

export default NewCourt
