import DeleteConfirmation from "@/components/DeleteConfirmation";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddTourTypeModal from "@/components/modules/admin/tour/AddTourTypeModal";
import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AddTourType = () => {
  const { data } = useGetTourTypesQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    try {
      const toastId = toast.loading("Removing......");
      const { data } = await removeTourType(tourId);
      console.log(data);
      if (data.success) {
        toast.success("Removed", { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-5 ">
      <h1 className="font-bold text-4xl">Tour Types</h1>
      <div className="flex justify-end mb-10">
        <AddTourTypeModal />
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map(
              (item: { name: string; _id: string }, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>
                    <DeleteConfirmation
                      onConfirm={() => handleRemoveTourType(item._id)}
                    >
                      <Button size="sm" className="bg-red-500">
                        <Trash2 />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;
