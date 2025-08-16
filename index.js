import { useState } from 'react'
import axios from 'axios'

export default function Home(){
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async ()=>{
    setLoading(true)
    try{
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await axios.post(apiUrl + '/generate', { prompt })
      setResult(res.data.text)
    }catch(e){
      alert('Error: '+ (e.response?.data?.detail || e.message))
    }finally{setLoading(false)}
  }

  return (
    <div style={{maxWidth:720, margin:'40px auto', fontFamily:'Arial,Helvetica,sans-serif', padding:'0 16px'}}>
      <h1 style={{fontSize:28}}>Navivo.ai — Starter</h1>
      <p>Simple AI writer demo. Type a prompt and click Generate.</p>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} style={{width:'100%', height:160, padding:10, fontSize:14}}/>
      <div style={{marginTop:12}}>
        <button onClick={handleGenerate} disabled={loading} style={{padding:'10px 16px', background:'#0b5cff', color:'#fff', border:'none', borderRadius:6}}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      <div style={{marginTop:18, background:'#f7f7f8', padding:12, borderRadius:6, minHeight:80}}>
        <pre style={{whiteSpace:'pre-wrap', margin:0}}>{result}</pre>
      </div>
      <p style={{marginTop:12, color:'#666', fontSize:13}}>Note: Set <code>NEXT_PUBLIC_API_URL</code> to your backend URL (e.g., https://your-backend.onrender.com) in Vercel environment variables.</p>
    </div>
  )
}
