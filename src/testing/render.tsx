import * as React from "react";
import { render as rtlRender } from "@testing-library/react"
import {Provider} from "../components/ui/provider.tsx";

export function render(ui: React.ReactNode) {
    return rtlRender(<>{ui}</>, {
        wrapper: (props: React.PropsWithChildren) => (
            <Provider>{props.children}</Provider>
        ),
    })
}
