import Chat from "./components/Chat/Chat"
import Talk from "./components/Talk/Talk"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"




function App() {
  return (
    <>
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30}>
        <Talk />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <Chat />
      </ResizablePanel>
    </ResizablePanelGroup>

    </>
  )
}

export default App