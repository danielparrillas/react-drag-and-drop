import { Person as PersonType } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface PersonProps {
  person: PersonType;
}

export default function Person({ person }: PersonProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: person.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="bg-white/40 p-4 rounded-md shadow-md"
    >
      <h4 className="font-bold">{person.name}</h4>
      <h4>{person.username}</h4>
      <h4>
        {person.address.city}, {person.address.street}
      </h4>
      <h4>{person.email}</h4>
    </div>
  );
}
