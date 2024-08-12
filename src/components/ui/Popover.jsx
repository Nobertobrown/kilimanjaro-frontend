import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  FloatingTree,
  FloatingNode,
  useId,
} from "@floating-ui/react";
import reserveAPI from "../../api/api";
import Dialog from "./Dialog";
import { FaEllipsis } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  IoEyeOutline,
  IoTrashOutline,
  IoLocateOutline,
  IoCreateOutline,
} from "react-icons/io5";

function Popover({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-end",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const Id = useId();

  return (
    <FloatingTree>
      <FloatingNode id="popover">
        <button
          ref={refs.setReference}
          {...getReferenceProps()}
          className="flex rounded-md items-center justify-center size-[30px] p-0 text-slate-500 bg-slate-100 hover:text-white hover:bg-slate-600 outline-none transition-all duration-200"
        >
          <FaEllipsis />
        </button>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <ul
              ref={refs.setFloating}
              style={floatingStyles}
              aria-labelledby={Id}
              {...getFloatingProps()}
              className="py-2 mt-1 text-left list-none bg-white rounded-md shadow-md min-w-[10rem] outline-none"
            >
              <li className="cursor-pointer">
                <a
                  onClick={() => setIsOpen(false)}
                  className="flex gap-1 items-center px-4 py-1.5 text-base transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500"
                >
                  <IoEyeOutline />
                  <span className="align-middle">Overview</span>
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  onClick={() => {
                    setIsDialogOpen(true);
                    setIsOpen(false); // Close popup when opening the dialog
                  }}
                  className="flex gap-1 items-center px-4 py-1.5 text-base transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500"
                >
                  <IoCreateOutline />
                  <span className="align-middle">Edit</span>
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/map");
                  }}
                  className="flex gap-1 items-center px-4 py-1.5 text-base transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500"
                >
                  <IoLocateOutline />
                  <span className="align-middle">Locate</span>
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  onClick={() => {
                    setIsOpen(false);
                    reserveAPI({
                      method: "DELETE",
                      route: "/customer",
                      data: { customerId: id },
                    });
                    window.location.reload();
                  }}
                  className="flex gap-1 items-center px-4 py-1.5 text-base transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500"
                >
                  <IoTrashOutline />
                  <span className="align-middle">Delete</span>
                </a>
              </li>
            </ul>
          </FloatingFocusManager>
        )}
        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      </FloatingNode>
    </FloatingTree>
  );
}

export default Popover;
