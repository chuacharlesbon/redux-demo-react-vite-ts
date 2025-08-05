'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, type FC } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdCloseCircle } from 'react-icons/io';
import { NavbarLinks } from '../constants/links';
import { Link } from 'react-router-dom';

export const MobileDrawer: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-white focus:outline-none"
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* Drawer Dialog */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Drawer Panel */}
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 left-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="w-64 bg-white p-4 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold">Menu</h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500"
                      >
                        <IoMdCloseCircle size={24} />
                      </button>
                    </div>
                    <nav>
                      <ul className="space-y-4">
                        {
                          NavbarLinks.map((url) => (
                            <li>
                              <Link className="m-2 p-2 rounded-md hover:underline" onClick={() => setIsOpen(false)} to={url.path}>{url.name}</Link>
                            </li>
                          ))
                        }
                      </ul>
                    </nav>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
