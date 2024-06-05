import CircularProgress from "@mui/material/CircularProgress";


export default function Loading() {
  return (
    <div className="h-screen w-[80vw] flex items-center justify-center">
        <CircularProgress size={100} />
      </div>
  )
}
