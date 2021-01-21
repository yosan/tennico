import { useFormik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

const NewCourt: React.FC<Record<string, unknown>> = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('必須項目です')
        .max(100, '最大100文字で入力してください'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    },
  })

  return (
    <main>
      <h2>コート追加</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input
              className={`${formik.errors.name ? 'invalid' : 'valid'}`}
              type="text"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <label htmlFor="name">コート名</label>
            <span className="helper-text" data-error={formik.errors.name} />
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
    </main>
  )
}

export default NewCourt
