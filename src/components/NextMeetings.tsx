import React, { useState, useEffect } from 'react';

interface Meeting {
  id: string;
  title: string;
  startTime: Date;
  url: string; // Added URL for the meeting link
}

function NextMeetings() {
  const [nextMeeting, setNextMeeting] = useState<Meeting | null>(null);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    // Mock data - replace this with actual API call in the future
    const mockMeetings: Meeting[] = [
      { id: '1', title: 'Team Standup', startTime: new Date(Date.now() + 10 * 60000), url: 'https://meet.google.com/abc-defg-hij' },
      { id: '2', title: 'Project Review', startTime: new Date(Date.now() + 60 * 60000), url: 'https://meet.google.com/123-456-789' },
      { id: '3', title: 'Client Call', startTime: new Date(Date.now() + 120 * 60000), url: 'https://zoom.us/j/1234567890' },
    ];

    const updateMeetings = () => {
      const now = new Date();
      const updatedMeetings = mockMeetings.filter(meeting => meeting.startTime > now);
      setUpcomingMeetings(updatedMeetings.slice(1)); // Exclude the next meeting
      setNextMeeting(updatedMeetings[0] || null);
    };

    updateMeetings();
    const interval = setInterval(updateMeetings, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getTimeUntilMeeting = (meeting: Meeting): string => {
    const now = new Date();
    const diffMs = meeting.startTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    return `${hours}h ${minutes}m`;
  };

  const isLessThan5Minutes = (meeting: Meeting): boolean => {
    const now = new Date();
    const diffMs = meeting.startTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    return diffMins < 5;
  };

  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="card bg-base-200 shadow-xl w-full">
      <div className="card-body p-2"> {/* Further reduced padding */}
        <h2 className="text-2xl font-bold mb-2 text-center">Meetings</h2>
        
        {/* Next Meeting Section */}
        <div className="mb-3"> {/* Slightly reduced margin-bottom */}
          <h3 className="text-xl font-semibold mb-1">Next</h3>
          {nextMeeting ? (
            <div className={`text-lg ${isLessThan5Minutes(nextMeeting) ? 'text-red-500' : ''}`}>
              <CalendarIcon />
              <a href={nextMeeting.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {nextMeeting.title}
              </a>
              <span className="ml-1">in {getTimeUntilMeeting(nextMeeting)}</span>
              <div className="text-sm text-gray-500 ml-7">
                {nextMeeting.startTime.toLocaleTimeString()} - {nextMeeting.startTime.toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div className="text-lg">No upcoming meetings</div>
          )}
        </div>
        
        {/* Upcoming Meetings Section */}
        {upcomingMeetings.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-1">Upcoming</h3>
            <ul className="list-none">
              {upcomingMeetings.map(meeting => (
                <li key={meeting.id} className="text-lg mb-1">
                  <CalendarIcon />
                  <a href={meeting.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {meeting.title}
                  </a>
                  <div className="text-sm text-gray-500 ml-7">
                    {meeting.startTime.toLocaleTimeString()} - {meeting.startTime.toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NextMeetings;