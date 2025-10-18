-- load defaults i.e lua_lsp
require("nvchad.configs.lspconfig").defaults()

local nvlsp = require "nvchad.configs.lspconfig"

--local dap = require("dap")
--dap.adapters.codelldb = {
--  type = 'server',
--  port = "${port}",
--  executable = {
--    -- Change this to your path!
--    command = "E:/Users/JAYB/AppData/Local/nvim-data/mason/bin/codelldb.cmd",
--    args = {"--port", "${port}"},
--    detached = false,
--  }
--}

local function organize_imports()
  local params = {
    command = "_typescript.organizeImports",
    arguments = {vim.api.nvim_buf_get_name(0)},
  }
  vim.lsp.buf.execute_command(params)
end

vim.lsp.config("ts_ls", {
  on_attach = nvlsp.on_attach,
  capabilities = nvlsp.capabilities,
  init_options = {
    preferences = {
      disableSuggestions = true,
    }
  },
  commands = {
    OrganizeImports = {
      organize_imports,
      description = "Organize Imports",
    }
  }
})
vim.lsp.enable("ts_ls")

-- cmake
vim.lsp.config("cmake", {
  on_attach = nvlsp.on_attach,
  capabilities = nvlsp.capabilities,
})
vim.lsp.enable("cmake")

-- go
vim.lsp.config("gopls", {
  on_attach = nvlsp.on_attach,
  capabilities = nvlsp.capabilities,
  cmd = {"gopls"},
  filetypes = { "go", "gomod", "gowork", "gotmpl" },
  settings = {
    gopls = {
      completeUnimported = true,
      usePlaceholders = true,
      analyses = {
        unusedparams = true,
      },
    },
  },
})
vim.lsp.enable("gopls")

-- python
local py_servers = {
  "pyright",
  "ruff",
}

for _, lsp in ipairs(py_servers) do
  vim.lsp.config(lsp, {
    on_attach = nvlsp.on_attach,
    capabilities = nvlsp.capabilities,
    filetypes = {"python"},
  })
end
vim.lsp.enable(py_servers)

-- c++
vim.lsp.config("clangd", {
  on_attach = function(client, bufnr)
    client.server_capabilities.signatureHelpProvider = false
    nvlsp.on_attach(client, bufnr)
  end,
  capabilities = nvlsp.capabilities,
  init_options = {
    fallbackFlags = {
      "--cuda-path=/usr/lib/cuda",
      "--cuda-gpu-arch=sm_50",
      "-L/usr/lib/cuda/lib64",
      "-I/usr/lib/cuda/include",
    },
  },
})
vim.lsp.enable("clangd")

vim.lsp.enable("tailwindcss")
