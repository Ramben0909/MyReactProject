import React from 'react'

const Log = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome on board!</h2>
        <p className="mb-6">We just need a little bit of data from you to get you started 🚀</p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input id="email" type="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div className="flex-1">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input id="confirm-password" type="password" name="confirm-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>

        <hr className="my-6" />

        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="first-name" name="first-name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div className="flex-1">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="last-name" name="last-name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">What best describes your role?</label>
          <select id="role" name="role" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="employee">Employee</option>
            <option value="founder">Founder</option>
            <option value="other">Other</option>
          </select>
        </div>

        <fieldset className="mb-6">
          <legend className="text-base font-medium text-gray-900">How did you find us?</legend>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input type="checkbox" id="google" name="acquisition" value="google" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="google" className="ml-3 block text-sm font-medium text-gray-700">Google</label>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="friend" name="acquisition" value="friend" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="friend" className="ml-3 block text-sm font-medium text-gray-700">Referred by friend</label>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="other" name="acquisition" value="other" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="other" className="ml-3 block text-sm font-medium text-gray-700">Other</label>
            </div>
          </div>
        </fieldset>

        <div className="mb-6">
          <label htmlFor="terms-and-conditions" className="flex items-center text-sm font-medium text-gray-700">
            <input type="checkbox" id="terms-and-conditions" name="terms" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-2" />
            I agree to the terms and conditions
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="reset" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Reset</button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default Log
