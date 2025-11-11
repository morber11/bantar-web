import RandomList from '../../../shared/ui/RandomList';
import Sidebar from '../../navigation/components/Sidebar';
import useFetchAllSlop from '../hooks/useFetchAllSlop';
import Spinner from '../../../shared/ui/Spinner';

export default function AiModePage() {
    const { list, loading, error } = useFetchAllSlop();

    return (
        <>
            <Sidebar />
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-5xl p-4 py-20">
                    <div>
                        <h1 className="text-4xl font-bold mb-8 text-center">AI Mode</h1>
                    </div>

                    <div>
                            {loading ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <Spinner />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <div>
                                    <p className="text-center">Error loading AI prompts</p>
                                    <p className="text-center">{error}</p>
                                </div>
                            </div>
                        ) : (
                            <RandomList list={list} itemType="ai" buttonLabel="New Prompt" showCategoryDetails={false} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}