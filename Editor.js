export default function Editor({value, onChange}){
  return (
    <textarea value={value} onChange={e=>onChange(e.target.value)} style={{width:'100%', minHeight:200}} />
  )
}
