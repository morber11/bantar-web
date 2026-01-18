import RandomList from '../../../shared/ui/RandomList';
import Sidebar from '../../navigation/components/Sidebar';
import Spinner from '../../../shared/ui/Spinner';
import useFetchToplists from '../hooks/useFetchToplists';

export default function TopListsPage() {
    const { list, loading, error } = useFetchToplists();

    return (
        <>
            <Sidebar />
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-5xl p-4 py-20">
                    <div>
                        <h1 className="text-4xl font-bold mb-8 text-center">Top Lists</h1>
                    </div>

                    <div>
                        {loading ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <Spinner />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <div>
                                    <p className="text-center">Error loading top lists</p>
                                    <p className="text-center">{error}</p>
                                </div>
                            </div>
                        ) : (
                            <RandomList list={list} itemType="toplist" buttonLabel="New Top List" showCategoryDetails={false} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
