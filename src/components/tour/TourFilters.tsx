import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useState } from "react";

const TourFilters = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
    undefined
  );
  const [selectedTourType, setSelectedTourType] = useState<string | undefined>(
    undefined
  );
  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery(undefined);
  console.log(tourTypeData);
  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );
  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );
  const handleClearFilter = () => {
    setSelectedDivision(undefined);
    setSelectedTourType(undefined);
  };
  return (
    <div className="col-span-3 w-full border p-4 rounded-2xl">
      <div className="flex justify-between">
        <h1>Filters</h1>
        <Button size="sm" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          onValueChange={(value) => setSelectedDivision(value)}
          value={selectedDivision ? selectedDivision : ""}
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Tour Types</Label>
        <Select
          onValueChange={(value) => setSelectedTourType(value)}
          value={selectedTourType ? selectedTourType : ""}
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tour Types</SelectLabel>
              {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TourFilters;
