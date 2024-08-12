import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  useId,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  FloatingNode,
} from "@floating-ui/react";
import Input from "./Input";
import Button from "./Button";

function Dialog({ isOpen, onClose }) {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: onClose,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: "mousedown",
    outsidePress: false,
  });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  function submit() {
    onClose();
  }

  return (
    <FloatingNode id="dialog">
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay
            className="bg-gray-300 bg-opacity-50 backdrop-blur flex px-2"
            lockScroll
          >
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                aria-labelledby={headingId}
                aria-describedby={descriptionId}
                {...getFloatingProps()}
                className="rounded-md bg-white p-5 mx-auto self-center basis-[896px]"
              >
                <h2 id={headingId}>Edit Details</h2>
                <form className="space-y-4" onSubmit={submit}>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      label="Name"
                      required
                      mandatory={true}
                      placeholder="John Doe"
                    />
                    <Input
                      type="email"
                      name="email"
                      label="Email"
                      placeholder="johndoe@gmail.com"
                    />
                    <Input
                      type="number"
                      name="nida"
                      label="National ID"
                      required
                      mandatory={true}
                      placeholder="19720202654560000456"
                    />
                    <Input
                      required
                      mandatory={true}
                      label="Phone Number"
                      type="tel"
                      name="phoneNo"
                      placeholder="+255123456789"
                    />
                    <Input
                      required
                      mandatory={true}
                      type="number"
                      name="age"
                      label="Age"
                      placeholder="Your age in years"
                      className="w-full"
                      min="1"
                    />
                    <Input
                      name="address"
                      label="Physical Address"
                      required
                      mandatory={true}
                      placeholder="123 Main St"
                    />
                  </div>
                  <Button type="submit" text="Update" />
                </form>
                <button onClick={onClose} className="mt-4 mx-auto block">
                  Close
                </button>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </FloatingNode>
  );
}

export default Dialog;
