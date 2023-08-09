// import PropTypes from "prop-types"

export const Square = ({ children, isSelected, updateBoard, index }) => {

    const className = `square ${isSelected ? 'is-selected' : ''}`;

    const handleClick = () => {
        updateBoard(index);
    }

    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    )
}

// Square.propTypes = {
//     children: PropTypes.node, // Propiedad que espera cualquier nodo o componente como hijo
//     updateBoard: PropTypes.func.isRequired,
//     index: PropTypes.number.isRequired,
//     isSelected: PropTypes.string.isRequired,
// };
