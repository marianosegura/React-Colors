import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';


function DraggableColorList({ colors, deleteColor }) {
  return ( 
    <div style={{ height: "100%" }}>
      {colors.map((c, idx) => 
        <DraggableColorBox 
          key={c.name} 
          color={c} 
          deleteColor={() => deleteColor(c.name)} 
          index={idx}  // index is used by SortableContainer
        />
      )}
    </div>
   );
}

export default SortableContainer(DraggableColorList);