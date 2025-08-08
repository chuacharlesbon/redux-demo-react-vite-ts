import { Suspense, use, type FC } from "react";

const testDataPromise = fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => res.json());

const TestComponent = () => {
    const testData = use(testDataPromise);

    return <p>Test: {JSON.stringify(testData)}</p>;
};

export const TestComponentNew: FC = () => {
    return(
        <Suspense fallback={<div className="p-4 bg-red-400">Loading</div>}>
            <TestComponent/>
        </Suspense>
    )
}