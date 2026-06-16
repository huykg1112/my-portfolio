import { permanentRedirect } from "next/navigation"

// Legacy route — projects now live at /projects.
export default function RealProjectsRedirect() {
  permanentRedirect("/projects")
}
