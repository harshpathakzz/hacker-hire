import { createStitches } from "@stitches/core";

const { css } = createStitches();

export const iconStandaloneClassName = css({
    svg: { margin: "auto" },
});

export const buttonClassName = css({
    appearance: "none",
    outline: "none",
    display: "flex",
    alignItems: "center",
    fontSize: "inherit",
    fontFamily: "inherit",
    backgroundColor: "transparent",
    transition: "color $default, background $default",
    cursor: "pointer",
    color: "$colors$clickable",
    border: 0,
    textDecoration: "none",

    "&:disabled": { color: "$colors$disabled" },

    "&:hover:not(:disabled,[data-active='true'])": { color: "$colors$hover" },

    '&[data-active="true"]': { color: "$colors$accent" },

    svg: {
        minWidth: "$space$4",
        width: "$space$4",
        height: "$space$4",
    },

    [`&.${iconStandaloneClassName}`]: {
        padding: "$space$1",
        height: "$space$7",
        display: "flex",
    },

    // If there's a children besides the icon
    [`&.${iconStandaloneClassName}&:not(:has(span))`]: {
        width: "$space$7",
    },

    [`&.${iconStandaloneClassName}&:has(svg + span)`]: {
        paddingRight: "$space$3",
        paddingLeft: "$space$2",
        gap: "$space$1",
    },
});

export const placeholderClassName = css({
    margin: "0",
    display: "block",
    fontFamily: "$font$mono",
    fontSize: "$font$size",
    color: "$syntax$color$plain",
    lineHeight: "$font$lineHeight",
});


export const editorClassName = css({
    flex: 1,
    position: "relative",
    overflow: "auto",
    background: "$colors$surface1",

    ".cm-scroller": {
        padding: "$space$4 0",
    },

    [`.${placeholderClassName}`]: {
        padding: "$space$4 0",
    },

    /**
     * For iOS: prevent browser zoom when clicking on sandbox.
     * Does NOT apply to code blocks.
     */
    "@media screen and (max-width: 768px)": {
        "@supports (-webkit-overflow-scrolling: touch)": {
            ".cm-content": { fontSize: "16px" },
        },
    },
});

export const cmClassName = css({
    margin: "0",
    outline: "none",
    height: "100%",
});

export const readOnlyClassName = css({
    fontFamily: "$font$mono",
    fontSize: "0.8em",
    position: "absolute",
    right: "$space$2",
    bottom: "$space$2",
    zIndex: "$top",
    color: "$colors$clickable",
    backgroundColor: "$colors$surface2",
    borderRadius: "99999px",
    padding: "calc($space$1 / 2) $space$2",

    [`& + .${buttonClassName}`]: {
        right: "calc($space$11 * 2)",
    },
});