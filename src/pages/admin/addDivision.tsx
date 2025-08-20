import AddDivisionModal from "@/components/modules/admin/division/AddDivisionModal";

const addDivision = () => {
  return (
    <div>
      <h1 className="font-bold text-4xl">Division</h1>
      <div className="flex justify-end mb-10">
        <AddDivisionModal />
      </div>
    </div>
  );
};

export default addDivision;
