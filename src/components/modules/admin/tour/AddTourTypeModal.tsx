import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createTourTypeSchema = z.object({
  name: z.string(),
});

const AddTourTypeModal = () => {
  const [open, setOpen] = useState(false);
  const [addTourType] = useAddTourTypeMutation();
  const form = useForm<z.infer<typeof createTourTypeSchema>>({
    resolver: zodResolver(createTourTypeSchema),
  });
  const onSubmit = async (data: z.infer<typeof createTourTypeSchema>) => {
    console.log(data);
    const res = await addTourType(data).unwrap();
    if (res.success) {
      toast.success("Tour Type Added");
      setOpen(false);
    }
  };
  const handleModalOpen = (value: boolean) => [setOpen(value)];
  return (
    <div>
      <Dialog open={open} onOpenChange={handleModalOpen}>
        <form>
          <DialogTrigger asChild>
            <Button onClick={() => handleModalOpen(true)}>Add Tour Type</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Tour Type</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter tour type name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter the tour type name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button form="add-tour-type" type="submit">
                Create Tour Type
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddTourTypeModal;
