export function TestResult({ oldRes, newRes, tasksAmount }) {
    return (
        <div className="flex gap-2 text-lg lg:text-xl font-medium">
            <p>{ newRes > oldRes ? newRes : oldRes }</p> of <p>{ tasksAmount }</p>
        </div>
    );
}