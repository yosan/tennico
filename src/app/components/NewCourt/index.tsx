import { Container, TextField, Typography } from '@material-ui/core'
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

const NewCourt: React.FC<Record<string, unknown>> = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      price: '',
      url: '',
    },
    validationSchema: CourtSchema,
    onSubmit: (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    },
  })

  return (
    <main>
      <Container>
        <Typography variant="h5" component="h2">
          コート追加
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                className={`${formik.errors.name ? 'invalid' : 'valid'}`}
                type="text"
                id="name"
                value={formik.values.name}
              />
              <label htmlFor="name">コート名</label>
              <span className="helper-text" data-error={formik.errors.name} />
            </div>
            <div className="input-field col s12">
              <input
                className={`${formik.errors.address ? 'invalid' : 'valid'}`}
                type="text"
                id="address"
                value={formik.values.address}
              />
              <label htmlFor="address">住所</label>
              <span
                className="helper-text"
                data-error={formik.errors.address}
              />
            </div>
            <div className="input-field col s12">
              <input
                className={`${formik.errors.price ? 'invalid' : 'valid'}`}
                type="text"
                id="price"
                value={formik.values.price}
              />
              <label htmlFor="price">利用料金</label>
              <span className="helper-text" data-error={formik.errors.price}>
                {
                  '例) 1時間　平日1,300円　土日祝日1,300円　【夜間照明料】 1時間以内500円'
                }
              </span>
            </div>
            <div className="input-field col s12">
              <input
                className={`${formik.errors.url ? 'invalid' : 'valid'}`}
                type="text"
                id="url"
                value={formik.values.url}
              />
              <label htmlFor="url">URL</label>
              <span className="helper-text" data-error={formik.errors.url} />
            </div>
          </div>
          <div className="row">
            <button
              className="waves-effect waves-light btn"
              type="submit"
              disabled={formik.isSubmitting}
            >
              登録
            </button>
          </div>
        </form>
      </Container>
    </main>
  )
}

export default NewCourt
