import DeleteConfirmation from "@/components/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useState } from "react";

const AddTourType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prv) => prv - 1);
  };
  const handleNextPage = () => {
    setCurrentPage((prv) => prv + 1);
  };
  console.log(currentPage);
  const { data } = useGetTourTypesQuery({ page: currentPage });
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

  const totalPage = data?.meta?.totalPage;
  console.log(totalPage, currentPage);

  return (
    <div className="w-full max-w-7xl mx-auto px-5 ">
      <h1 className="font-bold text-4xl">Tour Types</h1>
      <div className="flex justify-end mb-10">
        <AddTourTypeModal />
      </div>
      <div className="min-h-[600px]">
        <Table>
          <TableCaption>A list of your tour types.</TableCaption>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem
            onClick={handlePrevPage}
            className={`${
              currentPage === 1 && "opacity-50 pointer-events-none"
            }`}
          >
            <PaginationPrevious href="#" />
          </PaginationItem>
          {Array.from({ length: totalPage }, (_, index) => index + 1).map(
            (page) => {
              return (
                <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                  <PaginationLink isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          )}
          <PaginationItem
            onClick={handleNextPage}
            className={`${
              currentPage === totalPage && "opacity-50 pointer-events-none"
            } `}
          >
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AddTourType;
