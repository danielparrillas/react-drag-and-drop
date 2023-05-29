import { useEffect, useState } from "react";
import axios from "axios";
import { Person as PersonType } from "./types";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Person from "./components/Person";

function App() {
  const [people, setPeople] = useState<PersonType[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log(response);
        setPeople(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    setPeople((people) => {
      const oldIndex = people.findIndex((person) => person.id === active.id);
      const newIndex = people.findIndex((person) => person.id === over?.id);
      return arrayMove(people, oldIndex, newIndex);
    });
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-8 overflow-auto overflow-x-hidden flex flex-col md:flex-row align-middle gap-4">
      <div className="bg-white/30 to-transparent p-4 w-fit">
        <h2 className="font-bold text-5xl font-mono">People list</h2>
      </div>
      <div className="flex flex-col gap-4 w-full overflow-y-scroll overflow-x-hidden">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={people}
            strategy={verticalListSortingStrategy}
          >
            {people.map((person) => (
              <Person key={person.id} person={person} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
