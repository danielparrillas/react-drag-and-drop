import { useEffect, useState } from "react";
import axios from "axios";
import { Person as PersonType } from "./types";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
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
    console.log(active);
    console.log(over);
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-8 overflow-auto overflow-x-hidden">
      <div className="bg-white/30 to-transparent p-4 w-fit">
        <h2 className="font-bold text-5xl font-mono">People list</h2>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={people} strategy={verticalListSortingStrategy}>
          {people.map((person) => (
            <Person key={person.id} person={person} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
