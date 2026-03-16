import { useNavigate } from 'react-router-dom';
import RandomList from '../../../shared/ui/RandomList';
import Sidebar from '../../navigation/components/Sidebar';
import EventsSidebarContent from '../sidebarContent/EventsSidebarContent';
import { useFetchEvents } from '../hooks/useFetchEvents';
import Spinner from '../../../shared/ui/Spinner';

export default function EventsPage() {
    const navigate = useNavigate();
    const { list, eventName, available, loading, error } = useFetchEvents({ simulateMountLoading: true });

    // redirect if events aren't available but the user tries to navigate manually
    if (!loading && (!available || error)) {
        navigate('/', { replace: true });
        return null;
    }

    return (
        <>
            <Sidebar>
                <EventsSidebarContent />
            </Sidebar>
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-5xl p-4 py-20">
                    <div>
                        <h1 className="text-4xl font-bold mb-8 text-center">{eventName}</h1>
                    </div>

                    <div>
                        {loading ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <Spinner />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <div>
                                    <p className="text-center">Error loading events</p>
                                    <p className="text-center">Please try again later</p>
                                </div>
                            </div>
                        ) : (
                            <RandomList list={list} itemType="event" buttonLabel="New Event Question" showCategoryDetails={false} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
