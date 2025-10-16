-- This file needs to have same structure as nvconfig.lua
-- https://github.com/NvChad/ui/blob/v3.0/lua/nvconfig.lua
-- Please read that file to know all available options :(

---@type ChadrcConfig
local M = {}

M.base46 = {
	theme = "onedark",

	-- hl_override = {
	-- 	Comment = { italic = true },
	-- 	["@comment"] = { italic = true },
	-- },
}

-- M.nvdash = { load_on_startup = true }
-- M.ui = {
--       tabufline = {
--          lazyload = false
--      }
--}

M.mason = {
  pkgs = {
		-- c++
        "clangd",
        "clang-format",
        "codelldb",
		-- cmake
		    "cmake-language-server",
		-- rust
        "rust-analyzer",
		-- python
        "black",
        "debugpy",
        "mypy",
        "ruff",
        "pyright",
    -- go
        "gopls",
		-- nodejs
        "eslint-lsp",
        "js-debug-adapter",
        "prettier",
        "typescript-language-server",
        "tailwindcss-language-server",
  }
}

return M
