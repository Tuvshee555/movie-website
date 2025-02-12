import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
        </div>
        {/* <DialogFooter> */}
          {/* <Button type="submit">X</Button> */}
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
