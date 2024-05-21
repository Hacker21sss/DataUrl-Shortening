// // src/UrlShortener.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const UrlShortener = () => {
//   const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
//   const [url, setUrl] = useState('');
//   const [shortUrl, setShortUrl] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/url', { url });
//       setShortUrl(response.data.id);
//       setError('');
//     } catch (err) {
//       setError('Error shortening URL');
//       setShortUrl('');
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`);
//   };

//   const handleDashboardClick = () => {
//     navigate('/dashboard'); // Use navigate function to navigate to the dashboard page
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
//       <h1 className="text-xl font-bold">URL Shortener</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="url" className="block text-sm font-medium text-gray-700">Enter URL</label>
//           <input
//             type="url"
//             id="url"
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">
//           Shorten URL
//         </button>
//       </form>
//       {shortUrl && (
//         <div className="mt-4">
//           <p className="text-sm">Short Id:</p>
//           <div className="flex items-center">
//             <span className="text-blue-500">{`http://localhost:3000/${shortUrl}`}</span>
//             <button onClick={handleCopy} className="ml-2 py-1 px-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300">
//               Copy
//             </button>
//           </div>
//         </div>
//       )}
//       {error && <p className="text-red-500">{error}</p>}
      
//       {/* Dashboard button */}
//       <button onClick={handleDashboardClick} className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-700">
//         Go to Dashboard
//       </button>
//     </div>
//   );
// };

// export default UrlShortener;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Urlshortner = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/url', { redirect: url }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error generating short URL');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Shorten URL</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="url"
              placeholder="Enter URL to shorten"
              value={url}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Shorten URL
          </button>
        </form>
      </div>
    </div>
  );
};

export default Urlshortner;
