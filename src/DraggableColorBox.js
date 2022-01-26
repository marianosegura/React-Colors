import React from 'react';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { SortableElement } from 'react-sortable-hoc';
import styles from './styles/DraggableColorBoxStyles';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(styles);  // hook to use JSS with functional components

function DraggableColorBox(props) {
  const css = useStyles(props);
  const { deleteColor } = props;
  const { color, name } = props.color;
  return (  
    <div className={css.root} style={{ backgroundColor: color}}>
      <div className={css.boxContent}>
        <span>{name}</span>
        <DeleteOutlinedIcon 
          className={css.deleteIcon} 
          onClick={deleteColor}
        />
      </div>
    </div>
  );
}


export default SortableElement(DraggableColorBox);
