import { Client, Status } from '@googlemaps/google-maps-services-js'
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import config from 'config'
import { useFormik } from 'formik'
import { Court, CourtDoc } from 'models/court'
import { useRouter } from 'next/router'
import * as React from 'react'
import * as Yup from 'yup'
import {
  GeoPoint,
  addDoc,
  updateDoc,
  doc,
  collection,
  getFirestore,
} from 'firebase/firestore'
import { useTheme } from '@mui/material/styles'

const CourtSchema = Yup.object().shape({
  name: Yup.string()
    .required('必須項目です')
    .max(100, '最大100文字で入力してください'),
  prefecture: Yup.string()
    .required('必須項目です')
    .max(100, '最大10文字で入力してください'),
  city: Yup.string()
    .required('必須項目です')
    .max(100, '最大20文字で入力してください'),
  line: Yup.string()
    .required('必須項目です')
    .max(100, '最大100文字で入力してください'),
  price: Yup.string()
    .required('必須項目です')
    .max(200, '最大200文字で入力してください'),
  url: Yup.string().url().max(500, '最大500文字で入力してください').nullable(),
  surfaceOmni: Yup.number().integer().min(0, '0以上です'),
  surfaceHard: Yup.number().integer().min(0, '0以上です'),
  surfaceClay: Yup.number().integer().min(0, '0以上です'),
  nighter: Yup.boolean().nullable(),
  latitude: Yup.number().required('必須項目です').moreThan(0, '必須項目です'),
  longitude: Yup.number().required('必須項目です').moreThan(0, '必須項目です'),
})

const client = new Client({})

interface Props {
  courtDoc?: CourtDoc
}

const CourtForms: React.FC<Props> = ({ courtDoc }) => {
  const theme = useTheme()
  const router = useRouter()

  const isEdit = courtDoc !== undefined
  const formik = useFormik({
    initialValues: courtDoc
      ? {
          name: courtDoc.data.name,
          prefecture: courtDoc.data.prefecture,
          city: courtDoc.data.city,
          line: courtDoc.data.line,
          price: courtDoc.data.price,
          url: courtDoc.data.url,
          surfaceOmni: courtDoc.data.surfaces.omni,
          surfaceHard: courtDoc.data.surfaces.hard,
          surfaceClay: courtDoc.data.surfaces.clay,
          nighter: courtDoc.data.nighter,
          latitude: courtDoc.data.geo.latitude,
          longitude: courtDoc.data.geo.longitude,
        }
      : {
          name: '',
          prefecture: '',
          city: '',
          line: '',
          price: '',
          url: '',
          surfaceOmni: 0,
          surfaceHard: 0,
          surfaceClay: 0,
          nighter: false,
          latitude: 0,
          longitude: 0,
        },
    validationSchema: CourtSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const surfaces: Court['surfaces'] = {}
      if (values.surfaceOmni) {
        surfaces.omni = values.surfaceOmni
      }
      if (values.surfaceHard) {
        surfaces.hard = values.surfaceHard
      }
      if (values.surfaceClay) {
        surfaces.clay = values.surfaceClay
      }

      try {
        if (isEdit) {
          const data: Omit<Court, 'createdAt'> = {
            prefecture: values.prefecture,
            city: values.city,
            line: values.line,
            price: values.price,
            nighter: values.nighter,
            surfaces: surfaces,
            name: values.name,
            geo: new GeoPoint(values.latitude, values.longitude),
            url: values.url,
          }
          await updateDoc(doc(getFirestore(), `courts/${courtDoc.id}`), data)
          router.push(`/courts/${courtDoc.id}`)
        } else {
          const data: Court = {
            prefecture: values.prefecture,
            city: values.city,
            line: values.line,
            price: values.price,
            nighter: values.nighter,
            surfaces: surfaces,
            name: values.name,
            createdAt: new Date().getUTCMilliseconds(),
            geo: new GeoPoint(values.latitude, values.longitude),
            url: values.url,
          }
          const ref = await addDoc(collection(getFirestore(), 'courts'), data)
          router.push(`/courts/${ref.id}`)
        }
      } catch (e) {
        alert(e)
      }
      setSubmitting(false)
    },
  })

  const onClickGeo = React.useCallback(async () => {
    if (formik.errors.prefecture || formik.errors.city || formik.errors.line) {
      return
    }

    const result = await client.geocode({
      params: {
        address: [
          formik.values.prefecture,
          formik.values.city,
          formik.values.line,
        ].join(''),
        key: config.google.apiKeyGeo,
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
  }, [formik.values.prefecture, formik.values.city, formik.values.line])

  return (
    <main>
      <Container>
        <Typography variant="h5" component="h2">
          コート{isEdit ? '編集' : '登録'}
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
            style={{ margin: theme.spacing(1) }}
            name="name"
            fullWidth
          />
          <TextField
            error={
              formik.touched.prefecture &&
              formik.errors.prefecture !== undefined
            }
            id="prefecture"
            label="都道府県"
            value={formik.values.prefecture}
            helperText={formik.touched.prefecture && formik.errors.prefecture}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ margin: theme.spacing(1) }}
            name="prefecture"
            fullWidth
          />
          <TextField
            error={
              formik.touched.prefecture &&
              formik.errors.prefecture !== undefined
            }
            id="city"
            label="市区町村"
            value={formik.values.city}
            helperText={formik.touched.city && formik.errors.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ margin: theme.spacing(1) }}
            name="city"
            fullWidth
          />
          <TextField
            error={formik.touched.line && formik.errors.line !== undefined}
            id="line"
            label="住所その他"
            value={formik.values.line}
            helperText={formik.touched.line && formik.errors.line}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ margin: theme.spacing(1) }}
            name="line"
            fullWidth
          />
          <Button
            disabled={
              !formik.values.prefecture ||
              !formik.values.city ||
              !formik.values.line
            }
            color="primary"
            variant="contained"
            style={{ margin: theme.spacing(1) }}
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
            style={{ margin: theme.spacing(1) }}
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
            style={{ margin: theme.spacing(1) }}
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
            style={{ margin: theme.spacing(1) }}
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
            style={{ margin: theme.spacing(1) }}
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
            type="number"
            value={formik.values.surfaceOmni}
            helperText={formik.touched.surfaceOmni && formik.errors.surfaceOmni}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              margin: theme.spacing(1),
              maxWidth: 120,
            }}
            name="surfaceOmni"
          />
          <TextField
            error={
              formik.touched.surfaceHard &&
              formik.errors.surfaceHard !== undefined
            }
            id="surface-hard"
            label="ハード面数"
            type="number"
            value={formik.values.surfaceHard}
            helperText={formik.touched.surfaceHard && formik.errors.surfaceHard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              margin: theme.spacing(1),
              maxWidth: 120,
            }}
            name="surfaceHard"
          />
          <TextField
            error={
              formik.touched.surfaceClay &&
              formik.errors.surfaceClay !== undefined
            }
            id="surface-ccray"
            label="クレー面数"
            type="number"
            value={formik.values.surfaceClay}
            helperText={formik.touched.surfaceClay && formik.errors.surfaceClay}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              margin: theme.spacing(1),
              maxWidth: 120,
            }}
            name="surfaceClay"
          />
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
            style={{ margin: theme.spacing(1) }}
            name="nighter"
          />
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            color="secondary"
            variant="contained"
            style={{ margin: theme.spacing(1) }}
            fullWidth
          >
            {isEdit ? '更新' : '登録'}
          </Button>
        </form>
      </Container>
    </main>
  )
}

export default CourtForms
