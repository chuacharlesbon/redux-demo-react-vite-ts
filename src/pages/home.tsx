import { useState, type FC } from "react";
import { FaArrowAltCircleRight, FaCheck } from "react-icons/fa";
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button, Description, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from "@headlessui/react";
import { addPending, clearAll, clearFulfilled, clearOngoing, clearPending, deleteFulfilledItem, ongoingToFulfilled, pendingToOngoing } from "../redux/todo/todoSlice";
import { FaCirclePlus } from "react-icons/fa6";
import type { ToDoModel } from "../interfaces/todo";
import { MdDelete } from "react-icons/md";

interface Props {
    title?: string;
    data?: any; // optional prop
}

export const Home: FC<Props> = ({ title, data }) => {
    // return <>
    //     <div>Home Page: {title ?? "N/A"}! {data ?? "no data"}</div>
    //     <p>Text here</p>
    //     <div style={{ minHeight: "100dvh" }} />
    // </>;

    console.log(title);
    console.log(data);

    const pendingList = useSelector((state: RootState) => state.todo.pendingValue);
    const ongoingList = useSelector((state: RootState) => state.todo.ongoingValue);
    const fulfilledList = useSelector((state: RootState) => state.todo.fulfilledValue);
    const dispatch = useDispatch();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<ToDoModel>({
        id: (new Date()).getMilliseconds(),
        label: "Test",
        content: "Some texts here"
    });

    const submitForm = () => {
        dispatch(addPending(currentItem));
        setIsDialogOpen(false);
    }

    return <div style={{ minHeight: "100dvh" }}>

        <Dialog open={isDialogOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsDialogOpen(false)}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl border border-stone-300 shadow-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium">
                            Enter item
                        </DialogTitle>
                        <Field>
                            <Label className="text-sm/6 font-medium">Label</Label>
                            <Description className="text-sm/6">Use short, concise keyword</Description>
                            <Input
                                className='mt-3 block w-full rounded-lg border border-stone-300 bg-white/5 px-3 py-1.5 text-sm/6 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-stone-700'
                                onChange={(e) => setCurrentItem({
                                    ...currentItem,
                                    id: (new Date()).getMilliseconds(),
                                    label: e.target.value,
                                })}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium">Content</Label>
                            <Input
                                className='mt-3 block w-full rounded-lg border border-stone-300 bg-white/5 px-3 py-1.5 text-sm/6 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-stone-700'
                                onChange={(e) => setCurrentItem({
                                    ...currentItem,
                                    id: (new Date()).getMilliseconds(),
                                    content: e.target.value,
                                })}
                            />
                        </Field>
                        <div className="mt-4">
                            <Button
                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                onClick={submitForm}
                            >
                                Create
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>

        <header className="p-4 border-b flex flex-row justify-between items-center">
            <FaCheck className="text-green-500 mr-4" />
            <div className="w-full">
                <p className="text-xl font-bold text-stone-700">Personal To Do List ({pendingList.length + ongoingList.length + fulfilledList.length})</p>
                <p>Your guide</p>
            </div>
        </header>
        <section className="flex flex-col lg:flex-row py-4 px-8">
            <Button
                className="border border-stone-700 hover:bg-stone-700 hover:text-white p-2 rounded-md"
                onClick={() => { dispatch(clearAll()) }}
            >
                Clear All
            </Button>
        </section>
        <section className="flex flex-col lg:flex-row px-4 py-1">
            <div className="w-full lg:w-1/3 px-4 py-1">
                <div className="border border-stone-300 shadow-md rounded-md p-4">
                    <div className="flex flex-row justify-start">
                        <p className="text-lg text-stone-700 mr-4">Pending ({pendingList.length})</p>
                        <button aria-label="add-todo" className="mx-2" onClick={() => setIsDialogOpen(true)}>
                            <FaCirclePlus />
                        </button>
                        <button className="mx-2" onClick={() => dispatch(clearPending())}>
                            <MdDelete />
                        </button>
                    </div>
                    <div className="py-4">
                        {
                            pendingList.map((item) => (
                                <div className="flex flex-row justify-between p-2">
                                    <div>
                                        <p>{item.label}</p>
                                        <p className="text-sm">{item.content ?? "No content"}</p>
                                    </div>
                                    <button className="" onClick={() => dispatch(pendingToOngoing(item))}>
                                        <FaArrowAltCircleRight />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/3 px-4 py-1">
                <div className="border border-stone-300 shadow-md rounded-md p-4">
                    <div className="flex flex-row justify-start">
                        <p className="text-lg text-stone-700">Ongoing ({ongoingList.length})</p>
                        <button className="mx-2" onClick={() => dispatch(clearOngoing())}>
                            <MdDelete />
                        </button>
                    </div>
                    <div className="py-4">
                        {
                            ongoingList.map((item) => (
                                <div className="flex flex-row justify-between p-2">
                                    <div>
                                        <p>{item.label}</p>
                                        <p className="text-sm">{item.content ?? "No content"}</p>
                                    </div>
                                    <button className="" onClick={() => dispatch(ongoingToFulfilled(item))}>
                                        <FaArrowAltCircleRight />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/3 px-4 py-1">
                <div className="border border-stone-300 shadow-md rounded-md p-4">
                    <div className="flex flex-row justify-start">
                        <p className="text-lg text-stone-700">Fulfilled ({fulfilledList.length})</p>
                        <button className="mx-2" onClick={() => dispatch(clearFulfilled())}>
                            <MdDelete />
                        </button>
                    </div>
                    <div className="py-4">
                        {
                            fulfilledList.map((item) => (
                                <div className="flex flex-row justify-between p-2">
                                    <div>
                                        <p>{item.label}</p>
                                        <p className="text-sm">{item.content ?? "No content"}</p>
                                    </div>
                                    <button className="" onClick={() => dispatch(deleteFulfilledItem(item))}>
                                        <MdDelete />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    </div>;
};

export default function Home2() {return <Home/>};