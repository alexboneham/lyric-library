import { useParams } from "react-router-dom";

const LibraryItem = () => {
    const { id } = useParams();

    return (
        <div>Library item {id}</div>
    )
}

export default LibraryItem;