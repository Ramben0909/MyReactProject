import React from 'react'

const Contacts = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p className="text-lg mb-4">
        Hi, I'm [Your Name], the creator of the Movie Search App. I'm a passionate developer with a love for movies and technology. I created this app to help movie enthusiasts like myself find detailed information about films quickly and easily.
      </p>
      <p className="text-lg mb-4">
        If you have any questions, feedback, or just want to say hi, feel free to reach out to me:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Email: your.email@example.com</li>
        <li>Twitter: <a href="https://twitter.com/yourprofile" className="text-blue-500">@yourprofile</a></li>
        <li>LinkedIn: <a href="https://linkedin.com/in/yourprofile" className="text-blue-500">linkedin.com/in/yourprofile</a></li>
      </ul>
      <p className="text-lg">
        I look forward to hearing from you!
      </p>
    </div>
  )
}

export default Contacts
