import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/user.service'
import ErrorAlert from './ErrorAlert'
import { useState } from 'react'

type IFormInput = {
  email: string
  password: string
}

export default function Login() {
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data.email, data.password).then((response) => {
      if (response.error) {
        setError(response.error)
      } else {
        navigate('/')
      }
    })
  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-100">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1628968434441-d9c1c66dcde7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
              }}
            ></div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Login</h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-4 form-control w-full">
                  {error && <ErrorAlert error={error} />}
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Type here"
                    className={`input input-bordered w-full ${
                      errors.email && 'input-error'
                    }`}
                    id="email"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-red-400">
                        {errors.email?.message}
                      </span>
                    </label>
                  )}
                </div>
                <div className="mb-4 md:mr-2 md:mb-0 form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="***"
                    className={`input input-bordered w-full ${
                      errors.password && 'input-error'
                    }`}
                    id="password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-red-400">
                        {errors.password?.message}
                      </span>
                    </label>
                  )}
                </div>
                <div className="mb-6 text-center mt-6">
                  <button
                    className={`btn btn-outline btn-primary w-full ${
                      isSubmitting && 'loading'
                    }`}
                  >
                    Login Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/register"
                  >
                    Don't have an account? Register!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
