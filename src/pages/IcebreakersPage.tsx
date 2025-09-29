import RandomListComponent from '../components/list/RandomListComponent';
import useFetchList from '../hooks/useFetchList';

export default function IcebreakersPage() {

    const { list, loading, error } = useFetchList();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4">
            <RandomListComponent list={list} />
        </div>
    );
}
