// src/draggableNode.js
export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node-btn"
      draggable
      onDragStart={(event) => onDragStart(event, type)}
    >
      <span>{label}</span>
    </div>
  );
};