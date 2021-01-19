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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <main>
      <h2>コート追加</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">コート名</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        <button
          className="waves-effect waves-light btn"
          type="submit"
          disabled={formik.isSubmitting}
        >
          登録
        </button>
      </form>
    </main>
  )
}

export default NewCourt
